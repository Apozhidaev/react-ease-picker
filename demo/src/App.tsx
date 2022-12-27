import DatePicker from "../../src/index";
import RangePicker from "../../src/range";

function App() {
  return (
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <DatePicker
              onSelect={(date) => {
                console.log(date);
              }}
            />
          </td>
          <td>
            <RangePicker
              startDate="2022-01-01"
              endDate="2022-01-16"
              minDate="2020-01-01"
              maxDate="2023-01-01"
              onSelect={(start, end) => {
                console.log(start, end);
              }}
              presets={[
                {
                  label: "Last Week",
                  startDate: "2022-01-01",
                  endDate: "2023-01-01",
                },
                {
                  label: "Last Month",
                  startDate: "2021-01-01",
                  endDate: "2023-01-01",
                },
                {
                  label: "Last Year",
                  startDate: "2019-01-01",
                  endDate: "2023-01-01",
                },
              ]}
              position="right"
              autoApply={false}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
