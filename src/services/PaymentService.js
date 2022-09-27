import http from "@/services/Http";

class PaymentService {
    get() {
        return http.get('payments');
    }
}

export default new PaymentService();
