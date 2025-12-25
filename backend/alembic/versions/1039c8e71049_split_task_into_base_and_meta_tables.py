"""split task into base and meta tables

Revision ID: 1039c8e71049
Revises: 
Create Date: 2025-12-25 23:14:25.962819

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1039c8e71049'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Create Daily meta table
    op.create_table(
        "daily_task_meta",
        sa.Column("task_id", sa.Integer(), sa.ForeignKey("tasks.id"), primary_key=True),
        sa.Column("repeat_rule", sa.String(length=50)),
        sa.Column("priority", sa.Integer()),
    )

    # Create Deadline meta table
    op.create_table(
        "deadline_task_meta",
        sa.Column("task_id", sa.Integer(), sa.ForeignKey("tasks.id"), primary_key=True),
        sa.Column("deadline_at", sa.DateTime(timezone=True)),
        sa.Column("reminder_at", sa.DateTime(timezone=True)),
    )

    # Create Scheduled meta table
    op.create_table(
        "scheduled_task_meta",
        sa.Column("task_id", sa.Integer(), sa.ForeignKey("tasks.id"), primary_key=True),
        sa.Column("scheduled_start", sa.DateTime(timezone=True)),
        sa.Column("scheduled_end", sa.DateTime(timezone=True)),
        sa.Column("location", sa.String(length=100)),
    )

    # Remove old columns from tasks
    op.drop_column("tasks", "deadline_at")
    op.drop_column("tasks", "scheduled_start")
    op.drop_column("tasks", "scheduled_end")


def downgrade() -> None:
    """Downgrade schema."""
    op.add_column("tasks", sa.Column("deadline_at", sa.DateTime(timezone=True)))
    op.add_column("tasks", sa.Column("scheduled_start", sa.DateTime(timezone=True)))
    op.add_column("tasks", sa.Column("scheduled_end", sa.DateTime(timezone=True)))

    op.drop_table("scheduled_task_meta")
    op.drop_table("deadline_task_meta")
    op.drop_table("daily_task_meta")
