from typing import Union, Annotated
from pydantic import Field

from .daily_task import DailyTaskUpdate
from .deadline_task import DeadlineTaskUpdate
from .scheduled_task import ScheduledTaskUpdate

TaskUpdate = Annotated[
    Union[DailyTaskUpdate, DeadlineTaskUpdate, ScheduledTaskUpdate],
    Field(discriminator="type"),
]
