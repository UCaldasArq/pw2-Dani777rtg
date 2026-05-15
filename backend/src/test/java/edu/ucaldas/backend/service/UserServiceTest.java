package edu.ucaldas.backend.service;

import edu.ucaldas.backend.dto.UserDTO;
import edu.ucaldas.backend.entity.User;
import edu.ucaldas.backend.exception.ResourceNotFoundException;
import edu.ucaldas.backend.mapper.UserMapper;
import edu.ucaldas.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserById_ShouldReturnUser_WhenUserExists() {
        Long userId = 1L;
        User user = User.builder()
                .id(userId)
                .firstName("Test")
                .lastName("User")
                .document("123")
                .phoneNumber("555")
                .email("test@example.com")
                .build();
        UserDTO userDTO = UserDTO.builder()
                .id(userId)
                .firstName("Test")
                .lastName("User")
                .document("123")
                .phoneNumber("555")
                .email("test@example.com")
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.toDTO(user)).thenReturn(userDTO);

        UserDTO result = userService.getUserById(userId);

        assertNotNull(result);
        assertEquals("Test", result.getFirstName());
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void getUserById_ShouldThrowException_WhenUserDoesNotExist() {
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(userId));
    }
}
