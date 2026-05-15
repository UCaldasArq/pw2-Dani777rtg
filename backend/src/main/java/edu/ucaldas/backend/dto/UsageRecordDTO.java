package edu.ucaldas.backend.dto;

import edu.ucaldas.backend.entity.UsagePeriod;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsageRecordDTO {
    private Long id;
    private Long userId;
    /** Application display name (matches frontend field {@code application}). */
    private String application;
    private Integer days;
    private Integer hours;
    private Integer minutes;
    private UsagePeriod usagePeriod;
    private UserDTO user;

    public long getTotalMinutes() {
        int d = days != null ? days : 0;
        int h = hours != null ? hours : 0;
        int m = minutes != null ? minutes : 0;
        return (long) d * 24 * 60 + (long) h * 60 + m;
    }
}
