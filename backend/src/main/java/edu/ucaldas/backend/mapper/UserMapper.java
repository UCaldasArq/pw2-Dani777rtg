package edu.ucaldas.backend.mapper;

import edu.ucaldas.backend.dto.UserDTO;
import edu.ucaldas.backend.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .document(user.getDocument())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .city(user.getCity())
                .birthDate(user.getBirthDate())
                .createdAt(user.getCreatedAt())
                .build();
    }

    public User toEntity(UserDTO dto) {
        if (dto == null) {
            return null;
        }
        return User.builder()
                .id(dto.getId())
                .firstName(trim(dto.getFirstName()))
                .lastName(trim(dto.getLastName()))
                .document(trim(dto.getDocument()))
                .phoneNumber(trim(dto.getPhoneNumber()))
                .email(trim(dto.getEmail()))
                .city(blankToNull(trim(dto.getCity())))
                .birthDate(dto.getBirthDate())
                .build();
    }

    private static String trim(String s) {
        return s == null ? null : s.trim();
    }

    private static String blankToNull(String s) {
        return s == null || s.isEmpty() ? null : s;
    }
}
