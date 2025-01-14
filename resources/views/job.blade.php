<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Posting Form</title>
</head>
<body>
    <h1>Job Posting Form</h1>
    <form action="/api/jobs" method="POST" enctype="multipart/form-data">
        <!-- CSRF Token -->
        <input type="hidden" name="_token" value="{{ csrf_token() }}">

        <label for="title">Title:</label><br>
        <input type="text" name="title" required><br><br>

        <label for="job_type">Job Type:</label><br>
        <select name="job_type" required>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
        </select><br><br>

        <label for="job_role_id">Job Role ID:</label><br>
        <input type="number" name="job_role_id" required><br><br>

        <label for="contract_length">Contract Length:</label><br>
        <select name="contract_length">
            <option value="PERMANENT">Permanent</option>
            <option value="TEMPORARY">Temporary</option>
        </select><br><br>

        <label for="workplace_type">Workplace Type:</label><br>
        <select name="workplace_type" required>
            <option value="REMOTE">Remote</option>
            <option value="ONSITE">Onsite</option>
        </select><br><br>

        <label for="job_location">Job Location:</label><br>
        <input type="text" name="job_location" required><br><br>

        <label for="county">County:</label><br>
        <input type="text" name="county" required><br><br>

        <label for="job_details">Job Details (File):</label><br>
        <input type="file" name="job_details"><br><br>

        <label for="description">Description:</label><br>
        <textarea name="description" required></textarea><br><br>

        <label for="benefits">Benefits:</label><br>
        <textarea name="benefits"></textarea><br><br>

        <label for="important_skills">Important Skills (JSON format):</label><br>
        <textarea name="important_skills" required>[{"skill_id":101,"level_of_importance":5}]</textarea><br><br>

        <label for="other_skills">Other Skills:</label><br>
        <textarea name="other_skills" required>["Communication", "Teamwork"]</textarea><br><br>

        <label for="important_technologies">Important Technologies (JSON format):</label><br>
        <textarea name="important_technologies" required>[{"technology_id":200,"level_of_importance":5}]</textarea><br><br>

        <label for="other_technologies">Other Technologies:</label><br>
        <textarea name="other_technologies" required>["React", "Node.js"]</textarea><br><br>

        <label for="languages">Languages:</label><br>
        <textarea name="languages" required>["English", "Spanish"]</textarea><br><br>

        <label for="hiring_team_members">Hiring Team Members:</label><br>
        <textarea name="hiring_team_members" required>[1, 2, 3]</textarea><br><br>

        <label for="in_house_hiring_team">In-House Hiring Team:</label><br>
        <select name="in_house_hiring_team" required>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select><br><br>

        <label for="recruiter_id">Recruiter ID:</label><br>
        <textarea name="recruiter_id" required>[101]</textarea><br><br>

        <label for="recruiter">Recruiter:</label><br>
        <input type="text" name="recruiter" required><br><br>

        <label for="external_link">External Link:</label><br>
        <input type="url" name="external_link"><br><br>

        <label for="it_expires">It Expires:</label><br>
        <select name="it_expires" required>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select><br><br>

        <label for="expires_at">Expires At:</label><br>
        <input type="date" name="expires_at"><br><br>

        <label for="experience_level">Experience Level:</label><br>
        <select name="experience_level" required>
            <option value="ENTRY_LEVEL">Entry Level</option>
            <option value="MID_LEVEL">Mid Level</option>
            <option value="SENIOR_LEVEL">Senior Level</option>
        </select><br><br>

        <label for="currency">Currency:</label><br>
        <input type="text" name="currency" required value="USD"><br><br>

        <label for="min_salary">Min Salary:</label><br>
        <input type="number" name="min_salary" required><br><br>

        <label for="max_salary">Max Salary:</label><br>
        <input type="number" name="max_salary" required><br><br>

        <label for="salary_frequency">Salary Frequency:</label><br>
        <input type="text" name="salary_frequency"><br><br>

        <label for="sponsors_visa">Sponsors Visa:</label><br>
        <select name="sponsors_visa" required>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select><br><br>

        <label for="requires_video">Requires Video:</label><br>
        <select name="requires_video">
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select><br><br>

        <label for="is_public">Is Public:</label><br>
        <select name="is_public">
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select><br><br>

        <label for="enable_blind_recruiting">Enable Blind Recruiting:</label><br>
        <select name="enable_blind_recruiting">
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select><br><br>

        <label for="screener_questions">Screener Questions:</label><br>
        <textarea name="screener_questions">["What are your strengths?"]</textarea><br><br>

        <label for="free_distribution_channels">Free Distribution Channels:</label><br>
        <textarea name="free_distribution_channels">["LinkedIn", "Indeed"]</textarea><br><br>

        <label for="paid_distribution_channels">Paid Distribution Channels:</label><br>
        <textarea name="paid_distribution_channels">["Monster", "Glassdoor"]</textarea><br><br>

        <button type="submit">Submit</button>
    </form>
</body>
</html>
