package edu.ucaldas.backend.controller;

import edu.ucaldas.backend.dto.UsageRecordDTO;
import edu.ucaldas.backend.dto.UsageRegistrationDTO;
import edu.ucaldas.backend.service.UsageRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usage")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UsageRecordController {

    private final UsageRecordService usageRecordService;

    @GetMapping
    public ResponseEntity<List<UsageRecordDTO>> getAllUsage() {
        return ResponseEntity.ok(usageRecordService.getAllUsageRecords());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UsageRecordDTO>> getUsageByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(usageRecordService.getUsageRecordsByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<UsageRecordDTO> registerUsage(@Valid @RequestBody UsageRegistrationDTO registrationDTO) {
        return new ResponseEntity<>(usageRecordService.registerUsage(registrationDTO), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsageRecord(@PathVariable Long id) {
        usageRecordService.deleteUsageRecord(id);
        return ResponseEntity.noContent().build();
    }
}
