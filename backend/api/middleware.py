import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class APILoggingMiddleware(MiddlewareMixin):
    """
    Middleware to log API requests and responses
    """
    def process_request(self, request):
        if request.path.startswith('/api/'):
            logger.info(f"API Request: {request.method} {request.path} from {request.META.get('REMOTE_ADDR')}")
    
    def process_response(self, request, response):
        if request.path.startswith('/api/'):
            logger.info(f"API Response: {response.status_code} for {request.method} {request.path}")
        return response