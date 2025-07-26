"""
Email utility functions for SOBRE - Premium Healthy Cocktails
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import current_app
import logging


def send_email(to_email, subject, html_content, text_content=None):
    """Send an email using SMTP"""
    try:
        # Get email configuration from app config
        smtp_server = current_app.config.get('SMTP_SERVER', 'localhost')
        smtp_port = current_app.config.get('SMTP_PORT', 587)
        smtp_username = current_app.config.get('SMTP_USERNAME')
        smtp_password = current_app.config.get('SMTP_PASSWORD')
        from_email = current_app.config.get('FROM_EMAIL', 'hello@sobre.com')
        
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = from_email
        msg['To'] = to_email
        
        # Add text and HTML parts
        if text_content:
            text_part = MIMEText(text_content, 'plain')
            msg.attach(text_part)
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        # Send email
        if smtp_username and smtp_password:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.send_message(msg)
            server.quit()
        else:
            # For development, just log the email
            current_app.logger.info(f'Email would be sent to {to_email}: {subject}')
            current_app.logger.debug(f'Email content: {html_content}')
        
        return True
        
    except Exception as e:
        current_app.logger.error(f'Failed to send email: {e}')
        return False


def send_event_inquiry_email(inquiry):
    """Send notification email to admin about new event inquiry"""
    subject = f'New Private Event Inquiry - {inquiry.event_type}'
    
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #059669;">New Private Event Inquiry</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">Event Details</h3>
                <p><strong>Event Type:</strong> {inquiry.event_type}</p>
                <p><strong>Date:</strong> {inquiry.event_date}</p>
                <p><strong>Time:</strong> {inquiry.event_time}</p>
                <p><strong>Number of Guests:</strong> {inquiry.number_of_guests}</p>
                <p><strong>Drink Categories:</strong> {', '.join(inquiry.drink_categories) if inquiry.drink_categories else 'None specified'}</p>
                {f'<p><strong>Dietary Requirements:</strong> {inquiry.dietary_requirements}</p>' if inquiry.dietary_requirements else ''}
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">Contact Information</h3>
                <p><strong>Name:</strong> {inquiry.contact_name}</p>
                <p><strong>Email:</strong> <a href="mailto:{inquiry.contact_email}">{inquiry.contact_email}</a></p>
                <p><strong>Phone:</strong> <a href="tel:{inquiry.contact_phone}">{inquiry.contact_phone}</a></p>
            </div>
            
            {f'<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;"><h3 style="color: #059669; margin-top: 0;">Message</h3><p>{inquiry.message}</p></div>' if inquiry.message else ''}
            
            <div style="margin-top: 30px; padding: 20px; background-color: #059669; color: white; border-radius: 8px;">
                <p style="margin: 0;"><strong>Inquiry ID:</strong> {inquiry.id}</p>
                <p style="margin: 5px 0 0 0;"><strong>Submitted:</strong> {inquiry.created_at.strftime('%Y-%m-%d %H:%M')}</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    admin_email = current_app.config.get('ADMIN_EMAIL', 'admin@sobre.com')
    return send_email(admin_email, subject, html_content)


def send_event_confirmation_email(inquiry):
    """Send confirmation email to client about their event inquiry"""
    subject = 'Thank you for your SOBRE event inquiry!'
    
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #059669; margin: 0;">SOBRE</h1>
                <p style="color: #6B7280; margin: 5px 0 0 0;">Premium Healthy Cocktails</p>
            </div>
            
            <h2 style="color: #059669;">Thank you for your event inquiry!</h2>
            
            <p>Dear {inquiry.contact_name},</p>
            
            <p>We've received your inquiry for a private event and we're excited to help make your occasion special with our premium healthy cocktails!</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">Your Event Details</h3>
                <p><strong>Event Type:</strong> {inquiry.event_type}</p>
                <p><strong>Date:</strong> {inquiry.event_date}</p>
                <p><strong>Time:</strong> {inquiry.event_time}</p>
                <p><strong>Number of Guests:</strong> {inquiry.number_of_guests}</p>
                <p><strong>Inquiry ID:</strong> #{inquiry.id}</p>
            </div>
            
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
                <h3 style="color: #059669; margin-top: 0;">What happens next?</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Our events team will review your inquiry within 24 hours</li>
                    <li>We'll contact you to discuss your specific needs and preferences</li>
                    <li>We'll provide a custom quote tailored to your event</li>
                    <li>Once approved, we'll begin planning your perfect healthy cocktail experience</li>
                </ul>
            </div>
            
            <p>If you have any immediate questions or need to make changes to your inquiry, please don't hesitate to contact us:</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Email:</strong> <a href="mailto:hello@sobre.com" style="color: #059669;">hello@sobre.com</a></p>
                <p style="margin: 5px 0 0 0;"><strong>Phone:</strong> <a href="tel:+33556830169" style="color: #059669;">+33 5 56 83 01 69</a></p>
            </div>
            
            <p>Thank you for choosing SOBRE for your special event. We look forward to creating an unforgettable wellness cocktail experience for you and your guests!</p>
            
            <div style="margin-top: 30px; text-align: center; color: #6B7280; font-size: 14px;">
                <p>SOBRE - Premium Healthy Cocktails</p>
                <p>Boulevard de la Plage, 33120 Arcachon, France</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(inquiry.contact_email, subject, html_content)


def send_contact_inquiry_email(inquiry):
    """Send notification email to admin about new contact inquiry"""
    subject = f'New Contact Inquiry - {inquiry.subject}'
    
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #059669;">New Contact Inquiry</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">Contact Details</h3>
                <p><strong>Name:</strong> {inquiry.name}</p>
                <p><strong>Email:</strong> <a href="mailto:{inquiry.email}">{inquiry.email}</a></p>
                {f'<p><strong>Phone:</strong> <a href="tel:{inquiry.phone}">{inquiry.phone}</a></p>' if inquiry.phone else ''}
                <p><strong>Subject:</strong> {inquiry.subject}</p>
                <p><strong>Type:</strong> {inquiry.inquiry_type}</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">Message</h3>
                <p>{inquiry.message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #059669; color: white; border-radius: 8px;">
                <p style="margin: 0;"><strong>Inquiry ID:</strong> {inquiry.id}</p>
                <p style="margin: 5px 0 0 0;"><strong>Submitted:</strong> {inquiry.created_at.strftime('%Y-%m-%d %H:%M')}</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    admin_email = current_app.config.get('ADMIN_EMAIL', 'admin@sobre.com')
    return send_email(admin_email, subject, html_content)


def send_contact_confirmation_email(inquiry):
    """Send confirmation email to client about their contact inquiry"""
    subject = 'Thank you for contacting SOBRE!'
    
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #059669; margin: 0;">SOBRE</h1>
                <p style="color: #6B7280; margin: 5px 0 0 0;">Premium Healthy Cocktails</p>
            </div>
            
            <h2 style="color: #059669;">Thank you for contacting us!</h2>
            
            <p>Dear {inquiry.name},</p>
            
            <p>We've received your message and appreciate you taking the time to reach out to us. Our team will review your inquiry and get back to you as soon as possible.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">Your Message</h3>
                <p><strong>Subject:</strong> {inquiry.subject}</p>
                <p><strong>Inquiry ID:</strong> #{inquiry.id}</p>
                <p><strong>Submitted:</strong> {inquiry.created_at.strftime('%Y-%m-%d %H:%M')}</p>
            </div>
            
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
                <p style="margin: 0;"><strong>Response Time:</strong> We typically respond to inquiries within 24 hours during business hours.</p>
            </div>
            
            <p>If you need immediate assistance, please don't hesitate to contact us directly:</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Phone:</strong> <a href="tel:+33556830169" style="color: #059669;">+33 5 56 83 01 69</a></p>
                <p style="margin: 5px 0 0 0;"><strong>Visit us:</strong> Boulevard de la Plage, 33120 Arcachon, France</p>
            </div>
            
            <p>Thank you for your interest in SOBRE. We look forward to connecting with you soon!</p>
            
            <div style="margin-top: 30px; text-align: center; color: #6B7280; font-size: 14px;">
                <p>SOBRE - Premium Healthy Cocktails</p>
                <p>Boulevard de la Plage, 33120 Arcachon, France</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(inquiry.email, subject, html_content)
