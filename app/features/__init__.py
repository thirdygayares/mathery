import app.features.auth.router.auth_router as auth_router
import app.features.mathery.router.mathery_router as mathery_router

def register_routers(app):
    # authentication routes
    app.include_router(auth_router.router)
    app.include_router(mathery_router.router)