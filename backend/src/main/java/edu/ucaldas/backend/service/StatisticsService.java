package edu.ucaldas.backend.service;

import edu.ucaldas.backend.dto.UsageRecordDTO;
import edu.ucaldas.backend.repository.UserRepository;
import edu.ucaldas.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final UsageRecordService usageRecordService;
    private final UserRepository userRepository;

    public Map<String, Long> getTimeSpentPerApplication(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }

        return usageRecordService.getUsageRecordsByUserId(userId).stream()
                .collect(Collectors.groupingBy(
                        UsageRecordDTO::getApplication,
                        Collectors.summingLong(UsageRecordDTO::getTotalMinutes)
                ));
    }
}
