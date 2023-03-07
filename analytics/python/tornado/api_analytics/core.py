import requests


def log_request(data: dict):
    requests.post('https://analysis.ccbluex.net/api/log-request', json=data, timeout=5)
