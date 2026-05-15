package edu.ucaldas.backend.service;

import edu.ucaldas.backend.dto.ApplicationDTO;
import edu.ucaldas.backend.entity.Application;
import edu.ucaldas.backend.exception.ResourceNotFoundException;
import edu.ucaldas.backend.mapper.ApplicationMapper;
import edu.ucaldas.backend.repository.ApplicationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ApplicationServiceTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @Mock
    private ApplicationMapper applicationMapper;

    @InjectMocks
    private ApplicationService applicationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getApplicationById_ShouldReturnApplication_WhenExists() {
        Long appId = 1L;
        Application app = Application.builder().id(appId).name("YouTube").category("Video").build();
        ApplicationDTO appDTO = ApplicationDTO.builder().id(appId).name("YouTube").build();

        when(applicationRepository.findById(appId)).thenReturn(Optional.of(app));
        when(applicationMapper.toDTO(app)).thenReturn(appDTO);

        ApplicationDTO result = applicationService.getApplicationById(appId);

        assertNotNull(result);
        assertEquals("YouTube", result.getName());
    }

    @Test
    void getApplicationById_ShouldThrowException_WhenDoesNotExist() {
        Long appId = 1L;
        when(applicationRepository.findById(appId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> applicationService.getApplicationById(appId));
    }
}
