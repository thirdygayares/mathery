from uuid import UUID

from fastapi import APIRouter, Depends, status, Path, Body

from app.features.mathery.schema.convo_schema import ConvoMessageResponse, ConvoMessageRequest
from app.features.mathery.schema.mathery_schema import CreateMatheryRequest, MatheryResponse, FetchMatheryResponse
from app.features.mathery.service.create_convo_service import create_convo_service
from app.features.mathery.service.create_matery_service import create_mathery_service
from app.features.mathery.service.fetch_mathery_service import fetch_mathery_service

router = APIRouter(
    prefix="/api/mathery",
    tags=["mathery ai tutoring"],
)

@router.post(
    "/",
    response_model=MatheryResponse,
    status_code=status.HTTP_201_CREATED,
    description="Create a new Mathery AI tutoring session",
)
async def create_mathery(
    payload: CreateMatheryRequest,
    result=Depends(create_mathery_service),
):
    """
    Create a new Mathery AI tutoring session for the current user.
    """
    return result


@router.get(
    "/",
    response_model=FetchMatheryResponse,
    status_code=status.HTTP_200_OK,
    summary="List Mathery AI tutoring sessions with pagination & filters",
)
async def list_mathery(
    result=Depends(fetch_mathery_service),
):
    return result


@router.post(
    "/{mathery_uuid}/convo",
    response_model=ConvoMessageResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Send a message in this Mathery session",
)
async def send_convo_message(
    mathery_uuid: UUID = Path(..., description="Mathery session UUID"),
    payload: ConvoMessageRequest =  Body(..., description="The user’s chat message"),
    result = Depends(create_convo_service),
):
    """
    Persist a USER message to the Mathery conversation.
    """
    return result