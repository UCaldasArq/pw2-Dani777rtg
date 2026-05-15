package edu.ucaldas.backend.dto;

import edu.ucaldas.backend.entity.UsagePeriod;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsageRegistrationDTO {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Application is required")
    private String application;

    @NotNull(message = "Days is required")
    @Min(value = 0, message = "Days must be at least 0")
    private Integer days;

    @NotNull(message = "Hours is required")
    @Min(value = 0, message = "Hours must be between 0 and 23")
    @Max(value = 23, message = "Hours must be between 0 and 23")
    private Integer hours;

    @NotNull(message = "Minutes is required")
    @Min(value = 0, message = "Minutes must be between 0 and 59")
    @Max(value = 59, message = "Minutes must be between 0 and 59")
    private Integer minutes;

    @NotNull(message = "Usage period is required")
    private UsagePeriod usagePeriod;
}
