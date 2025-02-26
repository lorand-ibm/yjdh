import re

import pytest
from common.tests.conftest import *  # noqa
from companies.tests.data.company_data import (
    DUMMY_ASSOCIATION_DATA,
    get_dummy_company_data,
)
from companies.tests.factories import CompanyFactory
from django.conf import settings

from shared.service_bus.enums import YtjOrganizationCode

COMPANY_ROLE_JSON = [
    {
        "name": get_dummy_company_data()["name"],
        "identifier": get_dummy_company_data()["business_id"],
        "complete": True,
        "roles": ["NIMKO"],
    }
]


ASSOCIATION_ROLE_JSON = [
    {
        "name": DUMMY_ASSOCIATION_DATA["name"],
        "identifier": DUMMY_ASSOCIATION_DATA["business_id"],
        "complete": True,
        "roles": ["NIMKO"],
    }
]


@pytest.fixture()
def mock_get_organisation_roles_and_create_company(requests_mock):
    matcher = re.compile(re.escape(settings.EAUTHORIZATIONS_BASE_URL))
    requests_mock.get(matcher, json=COMPANY_ROLE_JSON)
    return CompanyFactory(business_id=COMPANY_ROLE_JSON[0]["identifier"])


@pytest.fixture()
def mock_get_organisation_roles_and_create_association(requests_mock):
    matcher = re.compile(re.escape(settings.EAUTHORIZATIONS_BASE_URL))
    requests_mock.get(matcher, json=ASSOCIATION_ROLE_JSON)
    return CompanyFactory(
        business_id=ASSOCIATION_ROLE_JSON[0]["identifier"],
        company_form="association",
        company_form_code=YtjOrganizationCode.ASSOCIATION_FORM_CODE_DEFAULT,
    )
