import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from 'src/app/core/services/asset.service';
import { ChartData, ChartDataset, ChartType } from 'chart.js';
import { CountUp } from 'countup.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  assets: any[] = [];
  categories: any[] = [];
  employees: any[] = [];
  assignments: any[] = [];

  dashboardStats: any[] = [];
  upcomingReturns: any[] = [];
  overdueAssignments: any[] = [];

  barChartLabels: string[] = [];

  public barChartData: ChartDataset<'bar'>[] = [];
  barChartType: ChartType = 'bar';

  donutChartData: ChartData<'doughnut'> = {
    labels: ['Available', 'Assigned'],
    datasets: [
      {
        data: [60, 40], // Replace with your actual values
        backgroundColor: ['#198754', '#dc3545'], // Green and red, you can customize
        hoverOffset: 6,
      },
    ],
  };

  donutChartType: ChartType = 'doughnut';

  constructor(private assetService: AssetService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllData();

    // Restore dark mode from storage
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      (document.getElementById('darkModeToggle') as HTMLInputElement).checked =
        true;
    }
  }

  toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem(
      'darkMode',
      body.classList.contains('dark-mode') ? 'true' : 'false'
    );
  }

  loadAllData() {
    this.assetService.getAssets().subscribe((assets) => {
      this.assets = assets;
      this.assetService.getAssetCategories().subscribe((categories) => {
        this.categories = categories;
        this.assetService.getEmployees().subscribe((employees) => {
          this.employees = employees;
          this.assetService.getAssignments().subscribe((assignments) => {
            this.assignments = assignments;
            this.prepareDashboardStats();
            this.filterReturns();
            this.prepareCharts();
          });
        });
      });
    });
  }

  prepareDashboardStats() {
    const availableAssets = this.assets.filter((a) => a.statusId === 1).length;
    const assignedAssets = this.assets.filter((a) => a.statusId === 2).length;

    this.dashboardStats = [
      {
        label: 'Total Assets',
        value: this.assets.length,
        bgClass: 'bg-gradient-primary',
        route: '/assets',
      },
      {
        label: 'Available Assets',
        value: availableAssets,
        bgClass: 'bg-gradient-success',
        route: '/assets',
      },
      {
        label: 'Assigned Assets',
        value: assignedAssets,
        bgClass: 'bg-gradient-warning',
        route: '/assignments',
      },
      {
        label: 'Employees',
        value: this.employees.length,
        bgClass: 'bg-gradient-info',
        route: '/employees',
      },
      {
        label: 'Categories',
        value: this.categories.length,
        bgClass: 'bg-gradient-secondary',
        route: '/categories',
      },
    ];

    this.donutChartData.datasets[0].data = [availableAssets, assignedAssets];
  }

  filterReturns() {
    const today = new Date();
    this.upcomingReturns = this.assignments.filter(
      (a) => a.returnDate && new Date(a.returnDate) > today
    );
    this.overdueAssignments = this.assignments.filter(
      (a) => a.returnDate && new Date(a.returnDate) < today
    );
  }

  prepareCharts() {
    const categoryMap = new Map<string, number>();

    for (let asset of this.assets) {
      const category =
        this.categories.find((c) => c.categoryId === asset.categoryId)?.name ||
        'Unknown';
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    }

    this.barChartLabels = Array.from(categoryMap.keys());

    // ✅ Wrap the values inside a ChartDataset object
    this.barChartData = [
      {
        label: 'Assets per Category',
        data: Array.from(categoryMap.values()),
        backgroundColor: '#0d6efd',
        barThickness: 30, // 👈 for thinner bars
      },
    ];
  }

  // 🔹 Navigate to respective section
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
  selectedCategoryId: number | null = null;

  onFilterCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCategory = selectElement.value;
    console.log('Selected Category:', selectedCategory);
    // Add your filtering logic here
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dashboardStats.forEach((stat, index) => {
        const counter = new CountUp(`stat-count-${index}`, stat.value);
        if (!counter.error) {
          counter.start();
        } else {
          console.error(counter.error);
        }
      });
    }, 500);
  }

donutChartOptions: any = {
  cutout: '70%', // Adjust between 50%-90% for thinner donut ring
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};


  barChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: this.isDarkMode ? '#fff' : '#000' },
      },
      y: {
        ticks: { color: this.isDarkMode ? '#fff' : '#000' },
      },
    },
  };
  get isDarkMode(): boolean {
    return document.body.classList.contains('dark-mode');
  }
}
