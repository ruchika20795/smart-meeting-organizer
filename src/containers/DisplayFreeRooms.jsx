import { useEffect, useState } from 'react';
import { getAllMeetingRooms, addMeetingQuery } from '../utils/queries';
import Card from '../components/Card';
import { useQuery, useMutation } from '@apollo/client';
import Loader from '../components/Loader';
import StyledButton from '../components/StyledButton';
import { getMeetingRoomDetails } from '../utils/meeting';
import getRandomNumber from '../utils/getRandomNumber';

export default function DisplayFreeRooms({
  building,
  title,
  date,
  startTime,
  endTime,
}) {
  const { loading, data } = useQuery(getAllMeetingRooms);
  const [addMeeting, { data: savedMeeting, loading: saving, error }] = useMutation(addMeetingQuery);

  const [freeRooms, setFreeRooms] = useState([]);
  const [selectedFreeRoom, setSelectedFreeRoom] = useState(null);
  const [showSuccesssMsg, setShowSuccessMsg] = useState(false);

  // Filtering meeting rooms based on selected data.
  useEffect(() => {
    if (
      !loading &&
      data &&
      data.MeetingRooms &&
      data.MeetingRooms.length !== 0
    ) {
      let free = data.MeetingRooms.filter((mr) => {
        const details = getMeetingRoomDetails(mr, date, startTime);
        return mr.building.id === building && details.meetingRoom.free;
      });
      setFreeRooms(free);
    }
  }, [loading, data, building, date, startTime]);

  const saveMeetingRoom = () => {
    addMeeting({
      variables: {
        id: getRandomNumber(),
        title: title,
        date: date,
        startTime: startTime,
        endTime: endTime,
        meetingRoomId: selectedFreeRoom.id,
      },
    });
  };

  useEffect(() => {
    if (savedMeeting && !error && !saving) {
      setShowSuccessMsg(true);
    }
  }, [savedMeeting, saving, error]);

  return loading ? (
    <Loader fullHeight />
  ) : freeRooms.length === 0 ? (
    <p>
      Sorry, no free meeting rooms available. Please try again with a different
      date/time/building.
    </p>
  ) : showSuccesssMsg ? (
    <div>Meeting room booked successfully!</div>
  ) : (
    <>
      <h3>Please select one of the free meeting rooms:</h3>
      {freeRooms.map((room) => (
        <Card
          key={room.id}
          title={room.name}
          onClick={() => setSelectedFreeRoom(room)}
          showBorder={selectedFreeRoom && selectedFreeRoom.id === room.id}
        >
          <p>{room.building.name}</p>
          Floor {room.floor}
        </Card>
      ))}
      <StyledButton disabled={!selectedFreeRoom} onClick={saveMeetingRoom}>
        {saving ? <Loader /> : 'Save'}
      </StyledButton>
    </>
  );
}
