from common.json import ModelEncoder

from .models import AutomobileVO

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]
