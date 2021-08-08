async function updateMap(api) {
    let response = await fetch(api);
    let data = await response.json();
    // console.log(data);
    var totalConfirmed=0;
    var totalActive=0;
    var totalRecovered=0;
    var totalDeceased=0;

    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    for(i in Object.keys(data))
    {

        totalConfirmed+=data[Object.keys(data)[i]].total.confirmed;
        totalRecovered+=data[Object.keys(data)[i]].total.recovered;
        totalDeceased+=data[Object.keys(data)[i]].total.deceased;
    }

    totalActive=totalConfirmed-(totalRecovered+totalDeceased);

    document.getElementById('ac1').innerText=numberWithCommas(totalConfirmed);
    document.getElementById('ac2').innerText=numberWithCommas(totalActive);
    document.getElementById('ac3').innerText=numberWithCommas(totalRecovered);
    document.getElementById('ac4').innerText=numberWithCommas(totalDeceased);

    let states = {
        "AN": "Andaman and Nicobar Islands",
        "AP": "Andhra Pradesh",
        "AR": "Arunachal Pradesh",
        "AS": "Assam",
        "BR": "Bihar",
        "CH": "Chandigarh",
        "CT": "Chhattisgarh",
        "DN": "Dadra and Nagar Haveli",
        "DD": "Daman and Diu",
        "DL": "Delhi",
        "GA": "Goa",
        "GJ": "Gujarat",
        "HR": "Haryana",
        "HP": "Himachal Pradesh",
        "JK": "Jammu and Kashmir",
        "JH": "Jharkhand",
        "KA": "Karnataka",
        "KL": "Kerala",
        "LD": "Lakshadweep",
        "MP": "Madhya Pradesh",
        "MH": "Maharashtra",
        "MN": "Manipur",
        "ML": "Meghalaya",
        "MZ": "Mizoram",
        "NL": "Nagaland",
        "OR": "Odisha",
        "PY": "Puducherry",
        "PB": "Punjab",
        "RJ": "Rajasthan",
        "SK": "Sikkim",
        "TN": "Tamil Nadu",
        "TG": "Telangana",
        "TR": "Tripura",
        "UP": "Uttar Pradesh",
        "UT": "Uttarakhand",
        "WB": "West Bengal",
        "LA": "Ladakh"
    }
    inWords = function(num, fixed) {
        if(typeof num!="string")
        {
            if (num === null) { return null; } 
            if (num === 0) { return '0'; } // terminate early
            fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
            var b = (num).toPrecision(2).split("e"), // get power
                k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
                c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
                d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
                e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
            return e;
        }
        else
        {
            return num;
        }
    }
    var str = "";
    var n = 1;
    for (i in Object.keys(data)) {
        str += `
            <tr class="st st${n}">
                <th scope="row">${n}</th>
                <td>${states[Object.keys(data)[i]]}</td>
                <td>${numberWithCommas(data[Object.keys(data)[i]].total.confirmed)}</td>
                <td>${numberWithCommas(data[Object.keys(data)[i]].total.confirmed - (data[Object.keys(data)[i]].total.recovered + data[Object.keys(data)[i]].total.deceased))}</td>
                <td>${numberWithCommas(data[Object.keys(data)[i]].total.recovered)}</td>
                <td>${numberWithCommas(data[Object.keys(data)[i]].total.deceased)}</td>
                <td>${inWords(data[Object.keys(data)[i]].total.tested)}</td>
                <td>${inWords(data[Object.keys(data)[i]].total.vaccinated1)}</td>
                <td>${inWords(data[Object.keys(data)[i]].total.vaccinated2)}</td>
            </tr>
        `;
        var m=1;
        if(data[Object.keys(data)[i]].districts!=null)
        {
            for(j in Object.keys(data[Object.keys(data)[i]].districts))
            {
                let dst1;
                let dst2;
                let dst3;
                let dst4;
                let dst5;
                let dst6;

                if(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.confirmed!=undefined)
                {
                    dst1=numberWithCommas(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.confirmed);
                }
                else{
                    dst1="Not Available";
                }
                if((data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.confirmed - (data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.recovered + data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.deceased))!=undefined)
                {
                    dst2=numberWithCommas(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.confirmed - (data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.recovered + data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.deceased));
                }
                else
                {
                    dst2="Not Available";
                }
                if(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.recovered!=undefined)
                {
                    dst3=numberWithCommas(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.recovered);
                }
                else
                {
                    dst3="Not Available";
                }
                if(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.deceased!=undefined)
                {
                    dst4=numberWithCommas(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.deceased);
                }
                else
                {
                    dst4="Not Available";
                }
                if(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.vaccinated1!=undefined)
                {
                    dst5=numberWithCommas(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.vaccinated1);
                }
                else
                {
                    dst5="Not Available";
                }
                if(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.vaccinated2!=undefined)
                {
                    dst6=numberWithCommas(data[Object.keys(data)[i]].districts[Object.keys(data[Object.keys(data)[i]].districts)[j]].total.vaccinated2);
                }
                else
                {
                    dst6="Not Available";
                }

                str += `
                <tr class="dis dis${n} table-success">
                    <th scope="row">${m}</th>
                    <td>${Object.keys(data[Object.keys(data)[i]].districts)[j]}</td>
                    <td>${dst1}</td>
                    <td>${dst2}</td>
                    <td>${dst3}</td>
                    <td>${dst4}</td>
                    <td> - </td>
                    <td>${inWords(dst5)}</td>
                    <td>${inWords(dst6)}</td>
                </tr>
            `;
            m++;
            }
        }
        n++;
    }
    document.querySelector('.tb').innerHTML = str;

    let b3=document.querySelectorAll('.dis');
    for(k of b3)
    {
        k.style.display='none';
    }

    let b2=document.querySelectorAll('.st');
    for(k of b2)
    {
        k.addEventListener('click',(e)=>{
            let ns=e.target.parentNode.classList[1].slice(2,);
            let b4=document.querySelectorAll(`.dis${ns}`);
            for(l of b4)
            {
                if(l.style.display=='none')
                {
                    l.style.display='table-row';
                }
                else
                {
                    l.style.display='none';
                }
            }
        })
    }
}
updateMap("https://api.covid19india.org/v4/min/data.min.json");
