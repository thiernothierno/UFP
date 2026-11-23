const now = new Date();
const year = now.getFullYear();

const en = {

    // Title
    header : {
        title: "UNION FOR PROGRESS"
    },

    // Navigation bar
    navigation: {
    home: "Home",
    about: "About",
    event: "Events",
    events: {
        past: "Past",
        upcoming: "Upcoming"
    },
    contact: "Contact",
    donate: "Donate",
    search: {
        placeholder: "Ask us anything about UFP"
    },
    mode: {
        dark_mode: "Dark mode",
        light_mode: "Light mode"
    }
},

// Home Page

home_page: {
    title: "Building a stronger brotherhood, together.",
    small_title: "Explore events open to members and visitors, learn about Union for Progress, and find member resources and support. Explore events open to members and visitors, learn about Union for Progress, and find member resources and support.",
    member_login: "Member Login",
    join_us: "Join Us",
    footer: `©${year} UFP. All rights reserved`
}, 

// About Page
about_page : {
the_story: ``,
who_we_are: ``,
what_we_do: ``,
our_mission: ``
},

// Event Page
past_event : {
title: "Explore Events, Gatherings, Conversations, And Moments That Have Brought Our Community Together.",
year_selection: "Select a year to see events"
},

upcoming_event : {
    title: ``
},

// Contact Page

contact_page: {
    title: "Contact Us",
    small_title: "Feel free to use the form or send us an email",
    other_way_to_contact: "Other Way To Contact Us",
    first_name: "First Name",
    last_name: "Last Name",
    email : "Email",
    phone: "Phone",
    message: "Message",
    submit: "Submit"

},

// Active member and board

active_home :{
member_menu : "MEMBER MENU",
menu : {
    payment: "Payments",
    rules: "Rules",
    meeting_and_assistance: "Meetings & Assistance",
    meeting_summary: "Meeting Summary",
    withdrawal: "Withdrawal",
    account: "Account"

},
hide_menu : "Hide member menu",
show_menu: "Show member menu",
member_home: "Member Home"

},



member_payments : {
    title: "Member Records",
    select_year: "Select Year",
    payment : "Payments",
    infraction: "Infractions",
    summary: "Summary",
    id : "ID",
        first_name: "First Name",
        last_name: "Last Name",

    all_payments: {
        monthly_payment : "Monthly Payment",
        title: "Monthly Payment Tracking",
        search : {
            placeholder: "Search by ID or First Name"
        },
        
        months_and_total : {
            jan : "Jan",
            fev : "Fev",
            mar : "Mar",
            apr : "Apr",
            may : "May",
            jun: "Jun",
            jul: "Jul",
            aug: "Aug",
            sep: "Sep",
            oct: "Oct",
            nov: "Nov",
            dec: "Dec",
            y_fee: "Y_fee",
            total: "Total",
            grand_total: "Grand Total"
        }




    },

    all_infractions: {
        infraction: "Infraction",
        title: "Member Infraction Tracking"
    },

      all_summary : {
        summary: "Summary"
    },



},


    
};

export default en;