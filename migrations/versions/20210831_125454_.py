"""empty message

Revision ID: ee6c40f2517c
Revises: b88b8e2cdcf6
Create Date: 2021-08-31 12:54:54.985189

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ee6c40f2517c'
down_revision = 'b88b8e2cdcf6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('applications', sa.Column('vet_name', sa.String(length=50), nullable=False))
    op.add_column('applications', sa.Column('vet_cellphone', sa.String(length=50), nullable=False))
    op.drop_column('applications', 'vet_info')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('applications', sa.Column('vet_info', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
    op.drop_column('applications', 'vet_cellphone')
    op.drop_column('applications', 'vet_name')
    # ### end Alembic commands ###
