package org.nlu.backend.dto.request.payment;

import java.math.BigDecimal;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BankWebhookRequest {
    Long id;                  // ID giao dịch trên SePay
    String gateway;           // Brand name của ngân hàng
    String transactionDate;   // Thời gian xảy ra giao dịch phía ngân hàng
    String accountNumber;     // Số tài khoản ngân hàng
    String code;              // Mã code thanh toán
    String content;           // Nội dung chuyển khoản
    String transferType;      // Loại giao dịch. in là tiền vào, out là tiền ra
    BigDecimal transferAmount; // Số tiền giao dịch
    BigDecimal accumulated;    // Số dư tài khoản (lũy kế)
    String subAccount;        // Tài khoản ngân hàng phụ (tài khoản định danh)
    String referenceCode;     // Mã tham chiếu của tin nhắn sms
    String description;       // Toàn bộ nội dung tin nhắn sms
} 