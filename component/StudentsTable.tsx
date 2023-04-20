import { useState } from "react";
import {
  TableView,
  TableBody,
  TableHeader,
  Column,
  Row,
  Cell,
} from "@react-spectrum/table";
import { ProgressCircle } from "@react-spectrum/progress";
import { Button } from "@react-spectrum/button";
import {
  ActionButton,
  ActionGroup,
  ButtonGroup,
  ComboBox,
  Flex,
  Item,
} from "@adobe/react-spectrum";

const studentsData = require("../data/data.json");

type Student = {
  studentName: string;
  courseName: string;
  moduleName: string;
  lessonName: string;
  progress: number;
};

const PAGE_SIZE = 10;

const getSortedData = (data: Student[], sortBy: string, sortDesc: boolean) => {
  return data.sort((a: any, b: any) => {
    if (a[sortBy] < b[sortBy]) {
      return sortDesc ? 1 : -1;
    } else if (a[sortBy] > b[sortBy]) {
      return sortDesc ? -1 : 1;
    } else {
      return 0;
    }
  });
};

const getPaginatedData = (data: Student[], page: number) => {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return data.slice(start, end);
};

const StudentsTable = () => {
  const [sort, setSort] = useState({ sortBy: "", sortDesc: false });
  const [page, setPage] = useState(1);

  const handleSort = (sortBy: string) => {
    if (sort.sortBy === sortBy) {
      setSort({ ...sort, sortDesc: !sort.sortDesc });
    } else {
      setSort({ sortBy, sortDesc: false });
    }
  };

  const sortedData = getSortedData(
    studentsData.data,
    sort.sortBy,
    sort.sortDesc
  );
  const paginatedData = getPaginatedData(sortedData, page);

  return (
    <Flex height="size-10000" width="100%" direction="column" gap="size-100">
      <TableView aria-label="Students Table" minWidth={320}>
        <TableHeader>
          <Column width={230}>
            <Button variant="primary" onPress={() => handleSort("studentName")}>
              {"Student name"}
              <p>&uarr;</p>
              <p>&darr;</p>
            </Button>
          </Column>
          <Column width={230}>
            <Button variant="primary" onPress={() => handleSort("courseName")}>
              Course name
              <p>&uarr;</p>
              <p>&darr;</p>
            </Button>
          </Column>
          <Column width={230}>
            <Button variant="primary" onPress={() => handleSort("moduleName")}>
              Module name
              <p>&uarr;</p>
              <p>&darr;</p>
            </Button>
          </Column>
          <Column width={230}>
            <Button variant="primary" onPress={() => handleSort("lessonName")}>
              Lesson name
              <p>&uarr;</p>
              <p>&darr;</p>
            </Button>
          </Column>
          <Column width={230}>
            <Button variant="primary" onPress={() => handleSort("progress")}>
              Progress
              <p>&uarr;</p>
              <p>&darr;</p>
            </Button>
          </Column>
          <Column width={230}>Actions</Column>
        </TableHeader>
        <TableBody>
          {paginatedData.map((student) => (
            <Row key={student.studentName}>
              <Cell>{student.studentName}</Cell>
              <Cell>{student.courseName}</Cell>
              <Cell>{student.moduleName}</Cell>
              <Cell>{student.lessonName}</Cell>
              <Cell>
                <Flex
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-around"}
                >
                  <ProgressCircle
                    value={student.progress}
                    aria-label={`Progress ${student.progress}%`}
                  />
                  <p>{student.progress}%</p>
                </Flex>
              </Cell>
              <Cell>
                <Button
                  variant="primary"
                  onPress={() =>
                    alert(`View/Edit Progress for ${student.studentName}`)
                  }
                >
                  View/Edit
                </Button>
              </Cell>
            </Row>
          ))}
        </TableBody>
      </TableView>
      <ActionGroup onAction={(value) => setPage(Number(value))}>
        <Item key="1">Page 1</Item>
        <Item key="2">Page 2</Item>
        <Item key="3">Page 3</Item>
      </ActionGroup>
    </Flex>
  );
};

export default StudentsTable;
