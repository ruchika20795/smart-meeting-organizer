import StyledButton from '../components/StyledButton';
import styled from 'styled-components';
import { useState } from 'react';
import DisplayFreeRooms from './DisplayFreeRooms';
import { formatDate } from '../utils/date';

const BuildingSelector = styled.select`
  width: 150px;
`;

const Container = styled.section`
  padding: 30px;
  text-align: center;
`;

const RowContainer = styled.div`
  margin: 20px auto;
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

export default function AddMeeting({ buildingsList }) {
  const [building, setBuilding] = useState(buildingsList[0].id);
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showNext, setShowNext] = useState(false);

  return (
    <Container>
      {showNext ? (
        <DisplayFreeRooms
          building={building}
          title={title}
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
      ) : (
        <>
          <h2>Add Meeting</h2>
          <RowContainer>
            Select building:
            <BuildingSelector
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            >
              {buildingsList.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </BuildingSelector>
          </RowContainer>
          <RowContainer>
            Title:
            <input type="text" name="meetingTitle" onChange={(e) => setTitle(e.target.value)} />
          </RowContainer>
          <RowContainer>
            Date:
            <input
              type="date"
              name="dateInput"
              onChange={(e) => setDate(formatDate(e.target.value))}
            />
          </RowContainer>
          <RowContainer>
            Start time (24-hour format):
            <input
              type="text"
              name="startTimeInput"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </RowContainer>
          <RowContainer>
            End time (24-hour format):
            <input
              type="text"
              name="endTimeInput"
              onChange={(e) => setEndTime(e.target.value)}
            />
          </RowContainer>
          <StyledButton
            onClick={() => setShowNext(true)}
            disabled={!building || !title || !date || !startTime || !endTime}
          >
            Next
          </StyledButton>
        </>
      )}
    </Container>
  );
}
