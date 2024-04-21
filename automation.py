from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.firefox.options import Options
import time

# setup webdriver
options = Options()
driver = webdriver.Edge()

# get url to testing
driver.get('http://localhost:5173/')
driver.maximize_window()

# get element input and button form
name_field = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@name="name"]')))
email_field = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@name="email"]')))
phone_field = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.XPATH, '//*[@name="phone"]')))
contact_button = WebDriverWait(driver, 30).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, 'form button[type="submit"]')))

# create array data for name, email, phone
data = [
    ('NAUFAL LABIB ALTHOF', 'naufal@gmail.com', '08912381293'),
    ('NAUFAL LABIB ALTHOF 1', 'naufal1@gmail.com', '108912381293'),
    ('NAUFAL LABIB ALTHOF 2', 'naufal2@gmail.com', '208912381293'),
]

# create looping from data to send keys in browser
for name, email, phone in data:
    name_field.clear()
    name_field.send_keys(name)
    time.sleep(1)
    email_field.clear()
    email_field.send_keys(email)
    time.sleep(1)
    phone_field.clear()
    phone_field.send_keys(phone)
    time.sleep(1)
    contact_button.click()
    time.sleep(5)  

# quit driver
driver.quit()