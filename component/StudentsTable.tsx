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
  ActionGroup,
  Flex,
  Item,
  useAsyncList,
  useCollator,
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

const getPaginatedData = (data: Student[], page: number) => {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return data.slice(start, end);
};

const StudentsTable = () => {
  const [page, setPage] = useState(1);

  let collator = useCollator({ numeric: true });

  let list = useAsyncList<Student>({
    load() {
      return {
        items: studentsData.data,
      };
    },
    async sort({
      items,
      sortDescriptor,
    }: {
      items: Student[];
      sortDescriptor: any;
    }) {
      return {
        items: items.sort((a: any, b: any) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = collator.compare(first, second);
          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }
          return cmp;
        }),
      };
    },
  });
  const paginatedData = getPaginatedData(list.items, page);

  return (
    <Flex height="size-10000" width="100%" direction="column" gap="size-100">
      <TableView
        aria-label="Students Table"
        minWidth={320}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <Column width={230} key="studentName" allowsSorting>
            Student name
          </Column>
          <Column width={230} key="courseName" allowsSorting>
            Course name
          </Column>
          <Column width={230} key="moduleName" allowsSorting>
            Module name
          </Column>
          <Column width={230} key="lessonName" allowsSorting>
            Lesson name
          </Column>
          <Column width={230} key="progress" allowsSorting>
            Progress
          </Column>
          <Column width={230}>Actions</Column>
        </TableHeader>
        <TableBody items={list.items} loadingState={list.loadingState}>
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
