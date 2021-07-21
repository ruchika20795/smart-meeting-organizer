import { gql } from '@apollo/client';

export const getAllBuildingsQuery = gql`
{
    Buildings {
        name 
        id
        meetingRooms {
            name
            meetings {
                title
                date
                startTime
                endTime
            }
        }
    }
}
`;

export const getAllMeetingRooms = gql`
{
    MeetingRooms {
      name
      floor
      id
      building {
        name
        id
      }
      meetings {
        title
        startTime
        endTime
        date
      }
    }
  } 
`;

export const addMeetingRoomQuery = gql`
mutation{
    MeetingRoom(
        id: 2
    		name: "Andhra"
    		buildingId: 2
    		floor: 3) {
        id
        name
    }
}
`;


export const addMeetingQuery = gql`
mutation ($id: Int!, $title: String!, $date: String!, $startTime: String!, $endTime: String!, $meetingRoomId: Int!){
    Meeting(
        id: $id
        title: $title
        date: $date
        startTime: $startTime
        endTime: $endTime
        meetingRoomId: $meetingRoomId) {
        id
        title
    }
}
`;
