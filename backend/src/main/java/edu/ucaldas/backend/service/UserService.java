package edu.ucaldas.backend.service;

import edu.ucaldas.backend.dto.UserDTO;
import edu.ucaldas.backend.entity.User;
import edu.ucaldas.backend.exception.ResourceNotFoundException;
import edu.ucaldas.backend.mapper.UserMapper;
import edu.ucaldas.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return userMapper.toDTO(user);
    }

    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        existingUser.setFirstName(trim(userDTO.getFirstName()));
        existingUser.setLastName(trim(userDTO.getLastName()));
        existingUser.setDocument(trim(userDTO.getDocument()));
        existingUser.setPhoneNumber(trim(userDTO.getPhoneNumber()));
        existingUser.setEmail(trim(userDTO.getEmail()));
        existingUser.setCity(blankToNull(trim(userDTO.getCity())));
        existingUser.setBirthDate(userDTO.getBirthDate());

        User updatedUser = userRepository.save(existingUser);
        return userMapper.toDTO(updatedUser);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    private static String trim(String s) {
        return s == null ? null : s.trim();
    }

    private static String blankToNull(String s) {
        return s == null || s.isEmpty() ? null : s;
    }
}
