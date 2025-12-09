package application.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/champions/**")
                .addResourceLocations("file:" + System.getProperty("user.dir") + "/images/champions/");
        registry.addResourceHandler("/items/**")
                .addResourceLocations("file:" + System.getProperty("user.dir") + "/images/items/");
    }
}

