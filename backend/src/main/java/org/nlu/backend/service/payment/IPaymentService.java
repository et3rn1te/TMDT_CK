package org.nlu.backend.service.payment;

import java.util.Map;
import org.nlu.backend.dto.request.payment.BankWebhookRequest;

public interface IPaymentService {
    /**
     * Process bank webhook payment notification
     * @param request The webhook request data from the bank
     * @return true if payment was successfully processed, false otherwise
     */
    boolean processBankWebhook(BankWebhookRequest request);
    
    /**
     * Check if a course has been paid for by a user
     * @param userId User ID
     * @param courseId Course ID
     * @return true if payment is completed and enrollment exists, false otherwise
     */
    boolean checkPaymentStatus(Long userId, Long courseId);
}
