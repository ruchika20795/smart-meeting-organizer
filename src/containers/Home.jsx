import styled from 'styled-components';
import Card from '../components/Card';
import StyledButton from '../components/StyledButton';
import { useEffect, useState } from 'react';
import { getMeetingRoomDetails } from '../utils/meeting';

const Container = styled.section`
  padding: 30px;
`;

export default function Home({ data }) {
  const [rooms, setRooms] = useState({ total: 0, free: 0 });
  const [meetings, setMeetings] = useState({ total: 0, today: 0, now: 0 });

  // Parsing the data object to extract details about meeting rooms and meetings.
  useEffect(() => {
    if (data && data.length > 0) {
      let totalMeetingRooms = 0,
        freeMeetingRooms = [],
        totalMeetingsToday = 0,
        meetingsGoingOnNow = 0,
        meetingRoomDetails;
      data.forEach((building) => {
        totalMeetingRooms += building.meetingRooms.length;
        building.meetingRooms.forEach((mr) => {
          meetingRoomDetails = getMeetingRoomDetails(mr);
          if (meetingRoomDetails.meetingRoom.free) {
            freeMeetingRooms.push(mr);
          }
          totalMeetingsToday += meetingRoomDetails.meeting.today;
          meetingsGoingOnNow += meetingRoomDetails.meeting.now;
        });
      });
      setRooms({ total: totalMeetingRooms, free: freeMeetingRooms.length });
      setMeetings((prev) => ({
        ...prev,
        now: meetingsGoingOnNow,
        today: totalMeetingsToday,
      }));
    }
  }, [data]);

  return (
    <Container>
      <Card title="Buildings" value={`Total ${data.length}`} />
      <Card title="Rooms">
        <span>
          {`Total ${rooms.total}`}
          <br />
          {`Free now ${rooms.free}`}
        </span>
      </Card>
      <Card title="Meetings">
        <span>
          {`Total ${meetings.today} today`}
          <br />
          {`Total ${meetings.now} going on now`}
        </span>
      </Card>
      <StyledButton onClick={() => (window.location.href = '/add-meeting')}>
        Add a Meeting
      </StyledButton>
    </Container>
  );
}
