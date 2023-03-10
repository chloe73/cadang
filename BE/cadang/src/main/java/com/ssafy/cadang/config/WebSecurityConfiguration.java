package com.ssafy.cadang.config;


import com.ssafy.cadang.jwt.*;
import com.ssafy.cadang.repository.UserRepository;
import com.ssafy.cadang.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Repository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@EnableWebSecurity
//@EnableMethodSecurity(prePostEnabled = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration

public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    //    private final CorsFilter corsFilter;
    private final UserRepository userRepository;


    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;


//    public WebSecurityConfiguration(CorsFilter corsFilter, UserRepository userRepository,
//                                    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
//                                    JwtAccessDeniedHandler jwtAccessDeniedHandler) {
//        this.corsFilter = corsFilter;
//        this.userRepository = userRepository;
//        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
//        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
//
//    }

    public WebSecurityConfiguration(UserRepository userRepository,
                                    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                                    JwtAccessDeniedHandler jwtAccessDeniedHandler) {
//        this.corsFilter = corsFilter;
        this.userRepository = userRepository;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;

    }
//    public WebSecurityConfiguration(UserRepository userRepository
//    ) {
////        this.corsFilter = corsFilter;
//        this.userRepository = userRepository;
//
//    }


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/swagger-ui/**",
                "/v3/api-docs/**",
                "/favicon.ico"
        );
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable();
//        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .formLogin().disable()
//                .httpBasic().disable()
//
//                .authorizeRequests()
//                .anyRequest().permitAll()
//
//                .and()
//                .addFilter(new JwtAuthenticationFilter(authenticationManager(), passwordEncoder(), userRepository)) // AuthenticationManager  // ???????????? ?????? ????????????????????? ????????? ??????????????? ??????
//                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository))
//                .exceptionHandling()
//                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
//                .and()
//                .cors().configurationSource(corsConfigurationSource());
//
//
//    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http
                .cors().configurationSource(corsConfigurationSource()).and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // ????????? ???????????? ?????????.
                .and()
//                .addFilter(corsFilter) //@CrossOrigin(??????X??? ???), ??????(O) => ???????????? ????????? ???????????????
                .formLogin().disable() // form ????????? ???????????? ?????? ?????????
                .httpBasic().disable() // basic ???????????? ?????? ????????? ???????????????.
                .authorizeRequests()
                //.antMatchers("/")
                //.permitAll()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
//                .antMatchers("/main").permitAll()
                .antMatchers("/user/**")
                .permitAll()
                .antMatchers("/user2/**").hasRole("USER") // ?????? ????????? ?????? ?????????????????? ????????? ????????????.
                .antMatchers("/admin/**").hasRole("ADMIN") // ????????? ????????? ?????? ?????????????????? ????????? ????????????.
                .antMatchers("/swagger-ui/**").permitAll()
                .antMatchers("/v3/api-docs/**").permitAll()
                .antMatchers("/favicon.ico").permitAll()
                .antMatchers("/api-docs/**").permitAll()
                .antMatchers("/websocket/**").permitAll()
                .anyRequest().authenticated()
//                .anyRequest().permitAll(
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), passwordEncoder(), userRepository)) // AuthenticationManager  // ???????????? ?????? ????????????????????? ????????? ??????????????? ??????
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository));



        // ???????????? ????????? ?????? ????????? ????????? ???????????? ??????

    }

    // CORS ?????? ??????
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);       // ????????? json ????????? JS??? ?????????????????? ???
        config.addAllowedOriginPattern("*");    // springboot cors ?????? ???, allowCredentials(true)??? allowedOrigin("*") ?????? ?????? ???????????? ??????
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.addExposedHeader("Authorization");
        source.registerCorsConfiguration("/**", config);
        return source;
    }

//    @Bean

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


}