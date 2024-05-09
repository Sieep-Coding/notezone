const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const remindersFilePath = path.join(__dirname, 'reminders.json');
let reminders = [];

// Load existing reminders from the file
function loadReminders() {
  try {
    const data = fs.readFileSync(remindersFilePath, 'utf8');
    reminders = JSON.parse(data);
    renderReminders();
  } catch (err) {
    // If the file doesn't exist, create it
    fs.writeFileSync(remindersFilePath, JSON.stringify([]));
  }
}

// Save reminders to the file
function saveReminders() {
  fs.writeFileSync(remindersFilePath, JSON.stringify(reminders));
}

// Render reminders in the reminder list
function renderReminders() {
  const reminderList = document.querySelector('.reminder-list ul');
  reminderList.innerHTML = '';

  reminders.forEach((reminder, index) => {
    const li = document.createElement('li');
    li.textContent = reminder.title;
    li.addEventListener('click', () => {
      displayReminder(index);
    });
    reminderList.appendChild(li);
  });
}

// Display a reminder in the editor
function displayReminder(index) {
  const titleInput = document.querySelector('.reminder-editor input[type="text"]');
  const descriptionTextarea = document.querySelector('.reminder-editor textarea');
  const emailInput = document.querySelector('.reminder-editor input[type="email"]');

  titleInput.value = reminders[index].title || '';
  descriptionTextarea.value = reminders[index].description || '';
  emailInput.value = reminders[index].email || '';
  currentReminderIndex = index;
}

// Save the current reminder
function saveCurrentReminder() {
  const titleInput = document.querySelector('.reminder-editor input[type="text"]');
  const descriptionTextarea = document.querySelector('.reminder-editor textarea');
  const emailInput = document.querySelector('.reminder-editor input[type="email"]');

  const reminderTitle = titleInput.value.trim();
  const reminderDescription = descriptionTextarea.value.trim();
  const reminderEmail = emailInput.value.trim();

  if (currentReminderIndex === null) {
    // Create a new reminder
    reminders.push({
      title: reminderTitle,
      description: reminderDescription,
      email: reminderEmail
    });
  } else {
    // Update an existing reminder
    reminders[currentReminderIndex].title = reminderTitle;
    reminders[currentReminderIndex].description = reminderDescription;
    reminders[currentReminderIndex].email = reminderEmail;
  }

  saveReminders();
  renderReminders();
  clearEditor();
  sendReminderEmail(reminderTitle, reminderDescription, reminderEmail);
}

// Create a new reminder
function createNewReminder() {
  currentReminderIndex = null;
  clearEditor();
}

// Delete the current reminder
function deleteCurrentReminder() {
  if (currentReminderIndex !== null) {
    reminders.splice(currentReminderIndex, 1);
    saveReminders();
    renderReminders();
    clearEditor();
  }
}

// Clear the reminder editor
function clearEditor() {
  const titleInput = document.querySelector('.reminder-editor input[type="text"]');
  const descriptionTextarea = document.querySelector('.reminder-editor textarea');
  const emailInput = document.querySelector('.reminder-editor input[type="email"]');

  titleInput.value = '';
  descriptionTextarea.value = '';
  emailInput.value = '';
}

// Send reminder email
function sendReminderEmail(title, description, email) {
    const transporter = nodemailer.createTransport({
      // Configure your email transport service here
      // Example for Gmail:
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
      }
    });
  
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: `Reminder: ${title}`,
      text: description
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  
  // Event listeners
  document.querySelector('.save-btn').addEventListener('click', saveCurrentReminder);
  document.querySelector('.new-btn').addEventListener('click', createNewReminder);
  document.querySelector('.delete-btn').addEventListener('click', deleteCurrentReminder);
  
  // Initialize
  let currentReminderIndex = null;
  loadReminders();