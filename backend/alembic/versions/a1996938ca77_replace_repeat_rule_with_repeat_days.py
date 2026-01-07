"""replace repeat_rule with repeat_days

Revision ID: a1996938ca77
Revises: 1039c8e71049
Create Date: 2026-01-07 21:38:11.491859

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'a1996938ca77'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None



def upgrade():
    op.add_column(
        'daily_task_meta',
        sa.Column(
            'repeat_days',
            postgresql.ARRAY(sa.String(3)),
            nullable=False,
            server_default='{}'
        )
    )

    op.drop_column('daily_task_meta', 'repeat_rule')

def downgrade():
    op.add_column(
        'daily_task_meta',
        sa.Column('repeat_rule', sa.String(), nullable=True)
    )

    op.drop_column('daily_task_meta', 'repeat_days')
