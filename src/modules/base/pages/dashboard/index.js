import Header from "../../../../main/views/header";
import TableC from "../../../../main/components/table";
import JobListForm from "../../../../main/views/formTemplates/jobList";
import ModalWrapper from "../../../../main/components/ModalWrapper";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

const Dashboardpage = () => {
  const [mode, setMode] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [fieldsToExclude] = useState(["id", "categoryIds"]);

  const onCreateClick = () => {
    setMode("clicked");
  };

  const onCancel = () => {
    setMode(null);
  };

  const tableRef = useRef(null);

  const getDataFromBelow = (data) => {
    if (tableRef.current) {
      tableRef.current.changeData((prev) => {
        const copyData = [...prev];
        const foundIndex = copyData.findIndex((c) => c.id === data.id);
        if (foundIndex != -1) {
          copyData[foundIndex] = data;
        } else {
          copyData.push({ ...data, id: copyData.length + 1 });
        }

        toast.success(data.id ? "Edited successfully" : "Added successfully", {
          duration: 3000,
        });
        return copyData;
      });
    }
    setMode(null);
  };

  return (
    <div>
      <Header headerData={headerData} />
      <TableC
        filename="jobs"
        ref={tableRef}
        fieldToRedirect="jobSiteName"
        onCreateClick={onCreateClick}
        setHeaderData={setHeaderData}
        fieldsToExclude={fieldsToExclude}
      />
      {mode && (
        <ModalWrapper
          title="Add Joblist Site"
          shouldHideContentOverflow={true}
          onCancel={onCancel}
          passDataAbove={getDataFromBelow}
        >
          <JobListForm />
        </ModalWrapper>
      )}
    </div>
  );
};

export default Dashboardpage;
