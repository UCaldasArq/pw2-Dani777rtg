package edu.ucaldas.backend.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;

/**
 * Older DBs may have NULL {@code email} after schema evolution; placeholders keep constraints valid.
 */
@Component
@Order(100)
@Slf4j
public class LegacyUserEmailBackfill implements ApplicationRunner {

    private final DataSource dataSource;

    public LegacyUserEmailBackfill(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(ApplicationArguments args) {
        try (Connection c = dataSource.getConnection();
                Statement st = c.createStatement()) {
            int n = st.executeUpdate(
                    "UPDATE users SET email = CONCAT('legacy-', id, '@migrated.local') "
                            + "WHERE email IS NULL OR TRIM(COALESCE(email, '')) = ''");
            if (n > 0) {
                log.warn(
                        "Backfilled {} user(s) with placeholder email (legacy DB). Ask users to set a real email.",
                        n);
            }
        } catch (Exception e) {
            log.debug("Skipping email backfill: {}", e.getMessage());
        }
    }
}
