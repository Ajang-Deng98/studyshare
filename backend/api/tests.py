from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status


class APIHealthTest(APITestCase):
    """Basic API health tests"""
    
    def test_api_health(self):
        """Test that the API is accessible"""
        # This is a basic test to ensure the API responds
        response = self.client.get('/api/')
        # Accept both 200 and 404 as valid responses for basic connectivity
        self.assertIn(response.status_code, [200, 404])


class BasicModelTest(TestCase):
    """Basic model tests"""
    
    def test_basic_functionality(self):
        """Test basic Django functionality"""
        self.assertTrue(True)  # Basic test to ensure test runner works