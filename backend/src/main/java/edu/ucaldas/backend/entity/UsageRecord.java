package edu.ucaldas.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usage_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsageRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @Column(nullable = false)
    private Integer days;

    @Column(nullable = false)
    private Integer hours;

    @Column(nullable = false)
    private Integer minutes;

    @Enumerated(EnumType.STRING)
    @Column(name = "usage_period", nullable = false, length = 20)
    private UsagePeriod usagePeriod;

    @Transient
    public long getTotalMinutes() {
        int d = days != null ? days : 0;
        int h = hours != null ? hours : 0;
        int m = minutes != null ? minutes : 0;
        return (long) d * 24 * 60 + (long) h * 60 + m;
    }
}
