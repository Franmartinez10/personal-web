import { Component } from '@angular/core';
import { StrapiService } from 'src/app/services/strapi.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
})
export class ResumeComponent {
  workHistory: any[] = [
    {
      startDate: 'Dec 2013',
      endDate: 'Current',
      position: 'Front End Web Developer',
      company: 'Pixelwars Inc.',
      description:
        'I currently work for Pixelwars creative studio. I create usable web interfaces, front end coding stuff and almost anything. But I love what I do.',
    },
    {
      startDate: 'Jun 2012',
      endDate: 'Dec 2013',
      position: 'Web Developer',
      company: 'Google Inc.',
      description:
        'I worked as a Web Developer at Google for 3 years. I create usable web interfaces, front end coding stuff and almost anything. But I love what I do.',
    },
    // Add more work history objects as needed
  ];

  education: any[] = [
    {
      year: '2002',
      fieldOfStudy: 'Atom Science',
      institution: 'Stanford University',
      description:
        'I studied atomic stuff at Stanford University. I create usable web interfaces, front end coding stuff and almost anything. But I love what I do.',
    },
    {
      year: '2010',
      fieldOfStudy: 'Software Engineering',
      institution: 'Harvard University',
      description:
        'I got my Master Degree at Harvard University. I create usable web interfaces, front end coding stuff and almost anything. But I love what I do.',
    },
    // Add more education objects as needed
  ];

  constructor(private apiService: StrapiService) {} // Replace YourAPIService with your actual API service

  ngOnInit(): void {
    this.getDataFromAPI(); // Fetch data from your API when the component initializes
  }

  getDataFromAPI() {
    // Implement logic to fetch data from your API using your service
    // For example:
    // this.apiService.getWorkHistory().subscribe((data: any[]) => {
    //   this.workHistory = data; // Assign fetched work history data to workHistory array
    // });
    // this.apiService.getEducation().subscribe((data: any[]) => {
    //   this.education = data; // Assign fetched education data to education array
    // });
  }
}
