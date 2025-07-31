import app.features.auth.router.auth_router as auth_router


def register_routers(app):


    # authentication routes
    app.include_router(auth_router.router)

