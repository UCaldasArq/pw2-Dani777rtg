package edu.ucaldas.backend.service;

import edu.ucaldas.backend.dto.UsageRegistrationDTO;
import edu.ucaldas.backend.dto.UsageRecordDTO;
import edu.ucaldas.backend.entity.Application;
import edu.ucaldas.backend.entity.UsageRecord;
import edu.ucaldas.backend.entity.User;
import edu.ucaldas.backend.exception.ResourceNotFoundException;
import edu.ucaldas.backend.mapper.UsageRecordMapper;
import edu.ucaldas.backend.repository.ApplicationRepository;
import edu.ucaldas.backend.repository.UsageRecordRepository;
import edu.ucaldas.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsageRecordService {

    private final UsageRecordRepository usageRecordRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final UsageRecordMapper usageRecordMapper;

    public List<UsageRecordDTO> getAllUsageRecords() {
        return usageRecordRepository.findAll().stream()
                .map(usageRecordMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<UsageRecordDTO> getUsageRecordsByUserId(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        return usageRecordRepository.findByUser_Id(userId).stream()
                .map(usageRecordMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public UsageRecordDTO registerUsage(UsageRegistrationDTO registrationDTO) {
        User user = userRepository.findById(registrationDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + registrationDTO.getUserId()));

        String appName = registrationDTO.getApplication().trim();
        Application application = applicationRepository.findByName(appName)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with name: " + appName));

        UsageRecord record = UsageRecord.builder()
                .user(user)
                .application(application)
                .days(registrationDTO.getDays())
                .hours(registrationDTO.getHours())
                .minutes(registrationDTO.getMinutes())
                .usagePeriod(registrationDTO.getUsagePeriod())
                .build();

        UsageRecord savedRecord = usageRecordRepository.save(record);
        return usageRecordMapper.toDTO(savedRecord);
    }

    public void deleteUsageRecord(Long id) {
        if (!usageRecordRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usage record not found with id: " + id);
        }
        usageRecordRepository.deleteById(id);
    }
}
