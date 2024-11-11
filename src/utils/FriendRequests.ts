export default class FriendRequest {
    constructor(request_id: string, name: string, profile_picture: string) {
        this.request_id = request_id;
        this.name = name;
        this.profile_picture = profile_picture;
    }
    request_id: string;
    name: string;
    profile_picture: string;
}
