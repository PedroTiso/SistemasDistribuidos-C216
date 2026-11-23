ALLOWED_PRIORITIES = {"low", "medium", "high"}

ALLOWED_STATUS_TRANSITIONS = {
    "open": {"in_progress", "cancelled"},
    "in_progress": {"resolved", "cancelled"},
    "resolved": set(),
    "cancelled": set(),
}


def validate_title(title: str) -> str:
    normalized_title = title.strip()

    if not 3 <= len(normalized_title) <= 100:
        raise ValueError("The maintenance request title must contain between 3 and 100 characters.")

    return normalized_title


def validate_priority(priority: str) -> str:
    if priority not in ALLOWED_PRIORITIES:
        raise ValueError("The priority must be low, medium, or high.")

    return priority


def can_transition_status(current_status: str, new_status: str) -> bool:
    return new_status in ALLOWED_STATUS_TRANSITIONS.get(current_status, set())
