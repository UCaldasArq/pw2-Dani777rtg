package edu.ucaldas.backend.config;

import edu.ucaldas.backend.entity.Application;
import edu.ucaldas.backend.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds a few applications when the database is empty so the usage form has options
 * without manual SQL.
 */
@Component
@RequiredArgsConstructor
public class ApplicationDataLoader implements ApplicationRunner {

    private final ApplicationRepository applicationRepository;

    @Override
    public void run(ApplicationArguments args) {
        if (applicationRepository.count() > 0) {
            return;
        }
        applicationRepository.saveAll(List.of(
                Application.builder().name("YouTube").category("Video").build(),
                Application.builder().name("TikTok").category("Social").build(),
                Application.builder().name("Instagram").category("Social").build(),
                Application.builder().name("Spotify").category("Audio").build(),
                Application.builder().name("Netflix").category("Video").build()
        ));
    }
}
