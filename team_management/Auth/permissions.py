from rest_access_policy import AccessPolicy

class UserAccessPolicy(AccessPolicy):
    statements = [

        {
            "action": ["list", "retrieve"],
            "principal": "authenticated",
            "effect": "allow"
        },

       
        {
            "action": ["update","put"],
            "principal": "authenticated",
            "effect": "allow",
            "condition": "is_own_account"
        },

        
        {
            "action": ["update", "destroy", "put"],
            "principal": ["group:faculty"],
            "effect": "allow"
        },

    ]
    def is_own_account(self, request, view, action):
        user = view.get_object()
        return user.id == request.user.id