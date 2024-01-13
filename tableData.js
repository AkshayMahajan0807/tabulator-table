let tableData = {
  columns: [
    {
      title: "ID",
      field: "id",

      width: 10,
      headerFilter: false,
      headerTooltip: "ID",
    },
    {
      title: "प्रकल्पाचे नाव",
      field: "prakalp_name",
      width: 70,
      headerFilter: false,
      headerTooltip: "प्रकल्पाचे नाव",
    },

    {
      title: "भूधारक नाव",
      field: "bhudharak_name",
      formatter: function (cell) {
        // Extract the values from the cell data
        const bhudharak_name = cell.getData().bhudharak_name;
        const id = cell.getData().id;
        const courtType = cell.getData().courtType;

        const kalamType = cell.getData().kalamType;

        const type = courtType ? `courtType=${courtType}` : `type=${kalamType}`;
        // Construct the URL based on the entry ID
        const url = `./comman-detail-page.php?rid=${id}&${type}`;

        // Return the anchor tag with the constructed URL and combined name
        return `<a href="${url}">${bhudharak_name}</a>`;
      },
    },
    {
      title: "गावाचे नाव",
      field: "villlage_name",
      headerFilter: false,
      headerTooltip: "गावाचे नाव",
    },
    {
      title: "भूसंपादन प्रस्ताव क्रमांक(LAR)",
      field: "lar",
      width: 100,
      headerFilter: false,
      headerTooltip: "भूसंपादन प्रस्ताव क्रमांक(LAR)",
    },
    {
      title: "SR क्रमांक",
      field: "sr",
      width: 100,
      headerFilter: false,
      headerTooltip: "SR क्रमांक",
    },
    {
      title: "विभाग",
      columns: [
        {
          title: "जावक क्रमांक",
          field: "vibhag_javak",
          headerFilter: false,
          width: 100,
          headerTooltip: "विभाग - जावक क्रमांक",
        },
        {
          title: "दिनांक",
          field: "vibhag_javak_date",
          headerFilter: false,
          width: 100,
          headerTooltip: "विभाग - दिनांक",
        },
      ],
    },

    {
      title: "मंडळ",
      columns: [
        {
          title: "जावक क्रमांक",
          field: "mandal_javak",
          headerFilter: false,
          width: 100,
          headerTooltip: "मंडळ - जावक क्रमांक",
        },
        {
          title: "दिनांक",
          field: "mandal_javak_date",
          headerFilter: false,
          width: 100,
          headerTooltip: "मंडळ - दिनांक",
        },
      ],
    },
    {
      title: "एकुण देय रक्कम",
      columns: [
        // {
        //     title: "सॉफ्टवेअर नुसार",
        //     field: "mandal_javak",
        //     headerFilter: false,
        //     width: 100,
        //     headerTooltip: "सॉफ्टवेअर नुसार",
        // },
        {
          title: "पत्रका नुसार",
          field: "total_payable_amount",
          headerFilter: false,
          width: 100,
          headerTooltip: "पत्रका नुसार",
        },
      ],
    },
  ],
};
