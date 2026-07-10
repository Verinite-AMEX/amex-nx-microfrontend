-- ── Members (matches frontend MOCK_MEMBERS exactly) ──────────────────────────
INSERT INTO members (client_code, full_name) VALUES
    ('12345', 'John Doe'),
    ('67890', 'Jane Smith'),
    ('11111', 'Robert Brown'),
    ('22222', 'Emily Carter'),
    ('33333', 'Michael Chen');

-- ── Cards ────────────────────────────────────────────────────────────────────
-- John Doe (12345)
INSERT INTO cards (member_id, card_number, card_type, status) VALUES
    (1, '3744 XXXXXX 9008', 'Centurion', 'Active'),
    (1, '3782 XXXXXX 0005', 'Platinum',  'Active'),
    (1, '3711 XXXXXX 1234', 'Gold',      'Inactive');

-- Jane Smith (67890)
INSERT INTO cards (member_id, card_number, card_type, status) VALUES
    (2, '3701 XXXXXX 4321', 'Platinum', 'Active');

-- Robert Brown (11111)
INSERT INTO cards (member_id, card_number, card_type, status) VALUES
    (3, '3799 XXXXXX 8888', 'Gold', 'Active');

-- Emily Carter (22222)
INSERT INTO cards (member_id, card_number, card_type, status) VALUES
    (4, '3755 XXXXXX 2200', 'Centurion', 'Active'),
    (4, '3766 XXXXXX 3311', 'Platinum',  'Active');

-- Michael Chen (33333)
INSERT INTO cards (member_id, card_number, card_type, status) VALUES
    (5, '3788 XXXXXX 5500', 'Gold', 'Active');

-- ── Pre-seeded wearable device (John Doe's Centurion card) ───────────────────
INSERT INTO wearable_devices (card_id, serial_no, device_type, color_selected, wearable_name, status, nfc_enabled, issue_date)
VALUES (1, 'SN-SEED001', 'Leather Watch', 'Brown', 'AMEX1', 'Issued', TRUE, '01 Jan 2025');