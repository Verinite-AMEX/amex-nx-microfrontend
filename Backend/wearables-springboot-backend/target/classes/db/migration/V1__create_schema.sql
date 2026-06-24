-- Members
CREATE TABLE members (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    client_code VARCHAR(20)  NOT NULL UNIQUE,
    full_name   VARCHAR(100) NOT NULL
);

-- Cards linked to a member
CREATE TABLE cards (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id   BIGINT       NOT NULL REFERENCES members(id),
    card_number VARCHAR(30)  NOT NULL,
    card_type   VARCHAR(30)  NOT NULL,  -- Centurion | Platinum | Gold
    status      VARCHAR(20)  NOT NULL   -- Active | Inactive
);

-- Wearable devices issued against a card
CREATE TABLE wearable_devices (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    card_id        BIGINT       NOT NULL REFERENCES cards(id),
    serial_no      VARCHAR(30)  NOT NULL UNIQUE,
    device_type    VARCHAR(50)  NOT NULL,   -- Leather Watch | Sport Band | Ceramic Ring …
    color_selected VARCHAR(30),
    wearable_name  VARCHAR(30),
    status         VARCHAR(20)  NOT NULL DEFAULT 'Issued',  -- Issued | Suspended | Terminated
    nfc_enabled    BOOLEAN      NOT NULL DEFAULT TRUE,
    issue_date     VARCHAR(20)  NOT NULL,
    created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);