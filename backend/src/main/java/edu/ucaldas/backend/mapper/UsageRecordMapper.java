package edu.ucaldas.backend.mapper;

import edu.ucaldas.backend.dto.UsageRecordDTO;
import edu.ucaldas.backend.entity.UsageRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UsageRecordMapper {

    private final UserMapper userMapper;

    public UsageRecordDTO toDTO(UsageRecord record) {
        if (record == null) {
            return null;
        }
        return UsageRecordDTO.builder()
                .id(record.getId())
                .userId(record.getUser().getId())
                .application(record.getApplication().getName())
                .days(record.getDays())
                .hours(record.getHours())
                .minutes(record.getMinutes())
                .usagePeriod(record.getUsagePeriod())
                .user(userMapper.toDTO(record.getUser()))
                .build();
    }
}
