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
                console.log(date, "DatePicker.onSelect");
              }}
              weekNumbers
              options={{
                AmpPlugin: {
                  darkMode: true,
                  resetButton: false,
                },
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
                console.log(start, end, "RangePicker.onSelect");
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
              // autoApply={false}
              // grid={1}
              // calendars={1}
              defaultOptions={{
                RangePlugin: {
                  tooltipNumber: (num) => {
                    return num + 100;
                  },
                },
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default App;
